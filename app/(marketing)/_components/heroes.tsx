export const Heroes = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h[-350px] md:h-[400px] md:w-[400px]">
          <div className="bg-red-700 p-0.5 h-full w-full"></div>
        </div>
        <div className="relative hidden md:block w-[300px] h-[300px] sm:w-[350px] sm:h[-350px] md:h-[400px] md:w-[400px]">
          <div className="bg-blue-500 p-0.5 h-full w-full"></div>
        </div>
      </div>
    </div>
  );
}
