import { Link } from "react-router-dom";
import getPercent from "../../utils/getPercent";




const Card = ({ data }) => {





 return <div className=" gap-8 flex flex-wrap items-center justify-center ">
    {data && data.map(item => (

      < div className='card m-2' key={item.id} >
        <Link to={'/catalog/productPage/' + item.id}>
          <img
            className='w-full p-2 rounded-xl h-full object-cover '
            src={item.imgPaths[0]}
            alt="divan"
          />
        </Link>
        <div className='px-2 mt-3 flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <span className='badge'>Длина-{item.height}</span>
            <span className='badge'>Глубина-{item.width}</span>
          </div>

          <h2 className="product-title " title="Best Furniture">
            Диван '{item.name}'
          </h2>

          <div className="h-[50px]">
            <span className="text-xl font-bold ">{item.price} руб.</span>
            {item.oldPrice && <div className=" flex items-center gap-2 mt-1 ">
              <span className="line-through text-sm text-gray-400">
                {item.oldPrice} руб.
              </span>
              <span className="discount-percent ">- {getPercent(item.oldPrice, item.price)}%</span>
            </div>}
          </div>

          <span className="flex items-center mt-1">
            <i className="bi bi-star-fill text-yellow-400"></i>
            <i className="bi bi-star-fill text-yellow-400"></i>
            <i className="bi bi-star-fill text-yellow-400"></i>
            <i className="bi bi-star-half text-yellow-400"></i>
            <i className="bi bi-star text-yellow-400"></i>
            <span className="text-xs ml-2 text-gray-500 ">более {item.orders} заказов</span>
          </span>

          <div className=" mt-5 flex gap-2 ">
            <button className="button-primary">Купить сейчас</button>
            <button className="text-red-500 button-icon"><i className="bi bi-heart-fill"></i></button>
            <button className="text-gray-500 button-icon"><i className="bi bi-eye-fill"></i></button>
          </div>

        </div>

      </div>
    ))}

  </div>
}

export default Card;