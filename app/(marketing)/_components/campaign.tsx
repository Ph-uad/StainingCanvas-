"use client";

export const Campaign = () => {
  const keywords: string[] = [
    "History",
    "Religion",
    "Literary Art",
    "Constitution",
    "Famous Quotes",
  ];

  return (
    <>
      <div className="">
        <h2>
          It is <em>Just</em> Words
        </h2>
        <h3>
          All of our <em>{keywords[0]}</em> is just words
        </h3>
      </div>
    </>
  );
};



// Huge fonts 
// Typing words in the kewords array at intervals 
//  After the animation is done 
// Let the words "It is just words, Literally Stain The ******** Canvas"