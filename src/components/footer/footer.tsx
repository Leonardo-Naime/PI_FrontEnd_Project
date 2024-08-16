const DefaultFooter = () => {
  return (
    <footer>
      <div className="bg-[#64BCED] h-10"></div>
      <div className="bg-[#254354] h-72 p-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center mb-4">
            <div className="w-full md:w-1/2 xl:w-1/3 p-4">
              <h2 className="text-white text-xl font-bold mb-2">Sobre Nós</h2>
              <p className="text-white text-base">
              Na CarsonCars, oferecemos uma experiência de compra de carros segura e confiável. Nossa equipe de especialistas seleciona e inspeciona cuidadosamente cada veículo para garantir a sua satisfação
              </p>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4">
              <h2 className="text-white text-xl font-bold mb-2">Contato</h2>
              <ul>
                <li className="text-white text-base mb-2">
                  <a href="#" className="hover:text-gray-200">
                    carsoncars@gmail.com
                  </a>
                </li>
                <li className="text-white text-base mb-2">
                  <a href="#" className="hover:text-gray-200">
                    (11) 1234-5678
                  </a>
                </li>
              </ul>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-4">
              <h2 className="text-white text-xl font-bold mb-2">Redes Sociais</h2>
              <ul>
                <li className="text-white text-base mb-2">
                  <a href="#" className="hover:text-gray-200">
                    Facebook
                  </a>
                </li>
                <li className="text-white text-base mb-2">
                  <a href="#" className="hover:text-gray-200">
                    Instagram
                  </a>
                </li>
                <li className="text-white text-base mb-2">
                  <a href="#" className="hover:text-gray-200">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#64BCED] h-10">
        <p className="text-white text-center pt-2">
          © 1995-2024 CarsonCars S.A. CNPJ: 03.347.828/0001-09 Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default DefaultFooter;