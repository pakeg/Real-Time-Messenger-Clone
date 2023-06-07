"client side"

import {IconType} from "react-icons";

interface IAuthButtonProps {
    icon: IconType;
    onClick: () => void;
    
}

const AuthButton: React.FC<IAuthButtonProps>  = ({
    icon: Icon,
    onClick
}) => {
    return (<button className="
        inline-flex
        w-full
        justify-center
        rounded-md
        bg-white
        px-4
        py-2
        text-gray-500
        shadow-sm
        ring-1
        ring-inset
        ring-gray-300
        hover:bg-gray-50
        focus:outline-offset-0
    " onClick={onClick}> 
        <Icon />
    </button>)
}

export default AuthButton;