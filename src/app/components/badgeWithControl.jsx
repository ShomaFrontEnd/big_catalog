

const BadgeWithControl = ({ data, onToggleModal }) => {

  if (!data || !data.length) {
    return <span className="text-yellow-200">Категории еще не созданы.</span>
  }




  return <>
    {data.map(i =>
    (<span key={i.id} className="inline-flex items-center px-2 m-1 text-sm font-medium rounded bg-blue-500 text-indigo-100">
      <button
        onClick={() => onToggleModal(i, 'prompt')}
        className="inline-flex rounded items-center px-1 mr-2 text-sm text-indigo-200 bg-transparent rounded hover:bg-green-500" >
        <i className="bi bi-pen"></i>
      </button>
      {i.name}
      <button
        onClick={() => onToggleModal(i, 'confirm')}

        className="inline-flex items-center  ms-2 text-sm text-indigo-200 bg-transparent rounded hover:bg-red-500" >
        <i className="bi bi-x"></i>
      </button>
    </span>)
    )
    }


  </>

}

export default BadgeWithControl;