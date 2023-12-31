import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faListUl } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  return (
    <div className="fixed bottom-0 h-[75px] left-0 right-0 p-4 text-gray-500 bg-gray-800">
      <nav className="flex justify-around p-1">
        <a href="#" className="text-gray-500">
          <FontAwesomeIcon icon={faHome} size="lg" />
        </a>
        <a href="#" className="text-gray-500 relative">
          <span className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white p-7 rounded-full">
            <FontAwesomeIcon icon={faCamera} size="lg" />
          </span>
        </a>
        <a href="#" className="text-gray-500">
          <FontAwesomeIcon icon={faListUl} size="lg" />
        </a>
      </nav>
    </div>
  );
};

export default Menu;
