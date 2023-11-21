import { useQuery } from '@tanstack/react-query'

import { Group } from '../../models/groups'
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
  if (groups) console.log(groups)

  return (
    <>
      <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 m-5 mb-10">
        {/* <h1>AllGroups</h1> */}
        {groups?.map((group) => (
          <div
            className="bg-white overflow-hidden hover:bg-green-100 border border-gray-200 p-3"
            key={group.id}
          >
            <div className="rounded-full bg-slate-300 max-w-xs">
              <img
                className="max-w-xs"
                src={`/images/icons/${group.image}`}
                alt={group.image}
              />
            </div>
            <h5 className="text-center mt-2 text-4xl text-slate-700 font-bold leading-normal mb-1">
              {group.name}
            </h5>
          </div>
        ))}
      </div>
    </>
  )
}

export default GroupList
