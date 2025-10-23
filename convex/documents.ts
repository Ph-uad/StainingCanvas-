import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

// export const get = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();

//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const documents = await ctx.db.query("documents").collect();
//     return documents;
//   },
// });

// archive function
// collect user ID and existing documents
// create a recursive function that checks for all the children and modify their isArchive status to true
// archive the main document

export const archive = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not Authenticated");

    const userID = identity.subject;
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Data Not Found");
    if (userID !== existingDocument?.userID) throw new Error("Unauthorized");

    const recursiveArchive = async (documentID: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userID", userID).eq("parentDocument", documentID)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    const documents = await ctx.db.patch(args.id, { isArchived: true });

    recursiveArchive(args.id);

    return documents;
  },
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userID = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (query) =>
        query.eq("userID", userID).eq("parentDocument", args.parentDocument)
      )
      .filter((query) => query.eq(query.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userID = identity.subject;

    const documents = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userID,
      isArchived: false,
      isPublished: false,
    });

    return documents;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userID = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userID", userID))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  },
});

export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userID = identity.subject;
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Not found");

    if (existingDocument.userID !== userID) throw new Error("Unauthorized");

    const recursiveRestore = async (documentID: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userID", userID).eq("parentDocument", documentID)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const documents = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return documents;
  },
});

export const remove = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userID = identity.subject;
    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) throw new Error("Not found");

    if (existingDocument.userID !== userID) throw new Error("Unauthorized");

    const documents = await ctx.db.delete(args.id);

    return documents;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("Not authenticated");

    const userID = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userID", userID))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getByID = query({
  args: { documentID: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const documents = await ctx.db.get(args.documentID);
    if (!documents) throw new Error("Not found");

    const userID = identity.subject;
    if (documents?.userID !== userID || !documents?.isPublished) throw new Error("Unauthorized");
    
    if (documents?.isPublished && !documents?.isArchived) return documents;

    return documents;
  },
});

export const getPublishedByID = query({
  args: { documentID: v.id("documents") },
  handler: async (ctx, args) => {
    const documents = await ctx.db.get(args.documentID);
    if (!documents) throw new Error("Not found");

    if (documents?.isPublished && !documents?.isArchived) return documents;

    return null;
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const { id, ...rest } = args;
    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) throw new Error("Not found");

    const userID = identity?.subject;
    if (existingDocument.userID !== userID) throw new Error("Unauthorized");

    const documents = await ctx.db.patch(args.id, { ...rest });
    return documents;
  },
});

export const removeIcon = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) throw new Error("Not found");

    const userID = identity?.subject;
    if (existingDocument.userID !== userID) throw new Error("Unauthorized");

    const documents = await ctx.db.patch(args.id, { icon: undefined });
    return documents;
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const existingDocument = await ctx.db.get(args.id);
    if (!existingDocument) throw new Error("Not found");

    const userID = identity?.subject;
    if (existingDocument.userID !== userID) throw new Error("Unauthorized");

    const documents = await ctx.db.patch(args.id, { coverImage: undefined });
    return documents;
  },
});
