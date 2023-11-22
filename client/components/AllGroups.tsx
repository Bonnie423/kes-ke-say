import { useQuery } from '@tanstack/react-query'
import { getAllGroups } from '../apis/groups'

const GroupList = () => {
  const {
    data: groups,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['groups'],
    queryFn: getAllGroups,
  })

  if (error) {
    return <p>There was an error trying to load the groups!</p>
  }

  if (!groups || isLoading) {
    return <p>Loading groups...</p>
  }

  return (
    <>
      <h1 className="text-center">All Groups</h1>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-5 mb-10">
        {groups?.map((group) => (
          <ul
            className="bg-white overflow-hidden hover:bg-blue-100 border border-gray-200 p-3 text-center"
            key={group.id}
          >
            <li>
              <div className="mx-auto w-40 h-40 flex items-center justify-center bg-slate-300 rounded-full mb-2 overflow-visible">
                <img
                  className="w-32 h-32 rounded-full overflow-visible"
                  src={`/images/icons/${group.image}`}
                  alt={group.image}
                />
              </div>
              <h5 className="text-xl text-slate-700 font-bold leading-normal mb-1">
                {group.name}
              </h5>
            </li>
          </ul>
        ))}
      </div>
    </>
  )
}

export default GroupList
