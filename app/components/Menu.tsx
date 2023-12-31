import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faListUl } from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
  return (
    <div className="fixed bottom-5 left-0 right-0 p-4 text-gray-500">
      <nav className="flex justify-around">
        <a href="#" className="text-gray-500">
          <FontAwesomeIcon icon={faHome} size="lg" />
        </a>
        <a href="#" className="text-gray-500 relative">
          <span className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-full">
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
