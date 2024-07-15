import React from "react";

const Footer = () => {
  const currentDate = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <footer className="w-full fixed bottom-0 left-0">
      <div>
        <h6 className="font-pop font-bold sm:text-xs lg:text-base text-right ">
          Created by
          <span className="font-merienda text-rose-700 sm:text-base lg:text-xl">
            María
          </span>
        </h6>
      </div>
      <div className="container mx-auto bg-rose-300">
        <p className="font-pop text-center font-bold text-black pt-5 border-t border-solid border-black sm:text-xs lg:text-base 2xl:text-lg truncate whitespace-no-wrap">
          Developed by María Salazar &copy; | {currentDate}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
