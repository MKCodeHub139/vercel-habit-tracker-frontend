import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, LineChart, Cell, Pie, PieChart } from 'recharts';
const Overview = ({lastWeekHabits,habits}) => {
  let count={}

  lastWeekHabits?.map((habit)=>{
    let days=[]
    const splitidDates=habit?.completedThisWeek?.map((date)=>date?.split("T")[0])
      splitidDates.map((date)=>{
        const d =new Date(date).toLocaleString('en-US',{weekday:'long'}).toLocaleLowerCase()
         count[d] = (count[d] || 0) + 1;
        if(!days.includes(d)){
          days.push(d)
        }
      })
    })
    let habitCategoryCount={}
    habits?.getHabits?.map((habit)=>{
  let category=[]
  habitCategoryCount[habit?.category] = (habitCategoryCount[habit?.category] || 0) + 1;
  if(!category?.includes(habit?.category)){
    category.push(habit?.category)
  }
})
// pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};
  const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const pieChartData = [
];
Object?.entries(habitCategoryCount)?.map((name,value)=>{
  pieChartData.push({
    name:name,
    value:value
  })

})

// bar chart
const barChartData = [
];
Object?.entries(count)?.map(([day,times])=>{
  barChartData.push({
    name:day, 
    completedHabit: times,
    possibleComplition: lastWeekHabits?.length})

})
  return (
    <div className="main w-full min-h-screen flex gap-3 flex-wrap justify-center ">

    <div className='md:w-[45%] w-full h-screen rounded-2xl bg-[#F5F5F5] p-5 overflow-hidden grow'>
      <div className="head pb-5">
      <h2 className='text-2xl'>Weekly Progress</h2>
      <p>Habbit completion this week </p>
      </div>
<ResponsiveContainer width="100%" height="80%" >
        <BarChart
          width={550}
          height={300}
          data={barChartData}
          className=''
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
          barSize={60}
        >
          <XAxis dataKey="name" scale="point" padding={{ left: 35, right: 10 }} />
          <YAxis dataKey={'possibleComplition'} domain={[0, lastWeekHabits?.length]}/>
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3"/>
          <Bar dataKey="completedHabit" background={{ }} className='fill-[#FF5722]'/>
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className="md:w-[45%]  w-full h-screen bg-[#F5F5F5] rounded-2xl p-5">
          <div className="head pb-5">
      <h2 className='text-2xl'>Habit Categories</h2>
      <p>Distribution of your habits by category </p>
      </div>
         <ResponsiveContainer width="100%" height="100%" className="">
      <PieChart width={600} height={600}>
        <Legend verticalAlign="bottom" height={150}/> 
        <Pie 
          data={pieChartData} className='cursor-pointer'
          cx="50%"
          cy="50%"
          labelLine={false}
         label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Overview