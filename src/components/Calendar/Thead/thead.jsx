export default function Thead() {
  const weekDayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  return (
      <thead>
          <tr>
              {weekDayNames.map(name =>
                  <th key={name}>{name}</th>
              )}
          </tr>
      </thead>
  )
}