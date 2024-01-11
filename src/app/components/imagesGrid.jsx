import React from 'react';


const ImagesGrid = ({ data, imageCount, wSize = 20, cols = 8, handleClick }) => {



  return (
    <div
      className={'grid w-ful gap-2 bg-gray-200 rounded-xl p-2 grid-cols-8 ' + cols} >
      {data
        ? data.map((i, index) => (
          <div key={i.id}>
            <img
              onClick={() => handleClick(index)}
              // className={`h-auto w-24  ${wSize} rounded-lg cursor-pointer `+ (index === imageCount ? ' border border-2 border-red-500 ' : '')}
              className={'h-auto rounded-lg cursor-pointer w-' + wSize + (index === imageCount ? ' border border-2 border-red-500 ' : '')}
              src={i.url}
              alt={i.name}
            />
          </div>
        ))
        : 'Загрузка...'}
    </div>
  );
}

export default ImagesGrid;