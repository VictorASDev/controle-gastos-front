

const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold">Controle de Gastos</h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#about" className="hover:underline">Sobre</a></li>
          <li><a href="#contact" className="hover:underline">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;