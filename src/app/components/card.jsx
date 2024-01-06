import { Link } from "react-router-dom";


const Card = ({ data }) => {
// console.log(data)

  return <div className=" gap-8 flex flex-wrap items-center justify-center ">
    {data && data.map(item => (

      < div className='card m-2' key={item.id} >

        <Link to={'/catalog/productPage/' + item.id}>
          <img
            className='w-full p-2 rounded-xl h-full object-cover '
            src={item.previewURL}
            alt="divan"
          />
        </Link>

        <div className='px-2 mt-3 flex flex-col gap-3'>
          <div className='flex items-center gap-2'>
            <span className='badge'>Длина-{item.height}</span>
            <span className='badge'>Глубина-{item.width}</span>
          </div>

          <h2 className="product-title " title="Best Furniture">
            '{item.name}'
          </h2>

          <div className="h-[50px]">
            <span className="text-xl font-bold ">{item.price} руб.</span>
            {item.discountPrice && <div className=" flex items-center gap-2 mt-1 ">
              <span className="line-through text-sm text-gray-400">
                {item.discountPrice} руб.
              </span>
              <span className="discount-percent ">- {item.discount}%</span>
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

          <div className=" mt-3 flex gap-2 ">
            <button className="button-primary"> Заказать </button>
            <Link className="text-gray-500  text-sm  button-icon" to={'/catalog/productPage/' + item.id}>
              Подробнее
            </Link>

          </div>

        </div>

      </div>
    ))}

  </div>
}

export default Card;