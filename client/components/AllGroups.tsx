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
      <div className="group-container">
        <h1>AllGroups</h1>
        {groups?.map((group) => (
          <div className="group" key={group.id}>
            <h5>{group.name}</h5>

            <ul>
              <li>
                <img src={group.image} alt={group.image} />
              </li>
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}





export default GroupList