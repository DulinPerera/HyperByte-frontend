import {MdCreate,MdDelete} from "react-icons/md"
import { MdOutlineFoodBank } from "react-icons/md";


const Card = ({Name,Address,Telephone,onEdit,onDelete,}) => {
  return (
    <div className='border rounnded p-4 bg-white hover:shadow-xl transition-all ease-in-out'>
        <div className="flex items-center justify-between">
            <div className="">
                <h1 className="text-xl font-medium ">{Name}</h1>
                <h2 className='text-s  text-slate-500'>{Address}</h2>
            </div>
            <MdOutlineFoodBank    className='icon-btn text-primary ' />
        </div>
        <p className="text-s text-slate-600 mt-1">{Telephone}</p>
        <div className="flex items-center justify-between mt-2">
         

          <div className="flex items-center gap-2">
            <MdCreate
              className='icon-btn hover:text-green-600'
              onClick={onEdit}
            />
            <MdDelete
              className="icon-btn hover:text-red-500"
              onClick={onDelete}
            />
          </div>
        </div>
    </div>
  )
}

export default Card