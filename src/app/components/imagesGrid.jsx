import React from 'react';


const ImagesGrid = ({ data,imageCount, wSize = '20', cols = '8', handleClick }) => {


  return (
    <div
      className={`grid w-ful grid-cols-${cols} gap-2 bg-gray-200 rounded-xl p-2`} >
      {data
        ? data.map((i,index) => (
          <div key={i}>
            <img
              onClick={() => handleClick(index)}
              className={`h-auto w-${wSize} rounded-lg cursor-pointer `+ (index === imageCount ? ' border border-2 border-red-500 ' : '')}
              src={i}
              alt={i.name}
            />
          </div>
        ))
        : 'Загрузка...'}
    </div>
  );
}

export default ImagesGrid;