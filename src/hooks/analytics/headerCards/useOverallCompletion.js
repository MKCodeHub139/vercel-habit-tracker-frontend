function useOverallCompletion(habits) {
  /* this month completed habits */
  
  // set status iscompletedThisMonth, neverCompleted, comletedBeforOnly for each habit
  const setThisMonthsHabit =habits?.getHabits?.map((habit) => {
    const thisMonthCompleted = habit.completedDates?.filter((date) => {
      return (
        date.split("T")[0].slice(0, 7) == new Date().toISOString().slice(0, 7)
      );
    })
    let status ="isCompletedThisMonth"
    if(thisMonthCompleted?.length > 0){
      status = "isCompletedThisMonth";
    }else if(thisMonthCompleted?.length === 0){
      status = "neverCompleted";
    }
    else{
      status ="comletedBeforOnly"
    }
    return {...habit,status, thisMonthCompleted}
  })


const td = new Date();
const startOfMonth = new Date(td.getFullYear(), td.getMonth(), 1);
const endOfMonth = new Date(td.getFullYear(), td.getMonth() + 1, 0);
// this month possible completions checking dayname in selectedDays
  const thisMonthPossibleCompletion = habits?.getHabits?.reduce((sum, habit) => {
    let count = 0;
    for (let d=new Date(startOfMonth);d<=endOfMonth;d.setDate(d.getDate()+1)) {
      const dayName = d.toLocaleString('en-US', { weekday: 'long' }).toLocaleLowerCase();
      if(habit.selectedDays?.some((d)=>d.toLocaleLowerCase()===dayName)){
        count ++
      }
    }
    return sum + count;
}, 0);
  // this month completed habits counting by habit status
  const thisMonthCompletedHabits =setThisMonthsHabit?.reduce((sum,habit)=>{
    if(habit.status ==="isCompletedThisMonth"){
        return sum + (habit.thisMonthCompleted?.length || 0)
    }
     return sum;
},0)
const progress = thisMonthPossibleCompletion > 0
  ? Math.round((thisMonthCompletedHabits / thisMonthPossibleCompletion) * 100)
  : 0;

// last month Starting date
  const lastMonthStartDate = new Date(td.getFullYear(), td.getMonth()-1, 1);
  // last month end date
  const endOfMonthLastMonth = new Date(td.getFullYear(), td.getMonth(), 0);
  // get last last month year and month
  let lastMonthDate =`${lastMonthStartDate.getFullYear()}-${(lastMonthStartDate.getMonth()+1).toString().padStart(2,'0')}`
  // set isCompleted true on those habit which was exists in last month
  const lastMonthExistsHabit =habits?.getHabits?.map((habit)=>{
    let isExistsInLasthMonth;
    let lastMonthCompletedHabits=[]
    if((habit.completedDates?.some(date=> date?.slice(0,7) <= lastMonthDate))||(habit.completedDates==[] && habit.createdAt?.slice(0,7) <=lastMonthDate) || habit.createdAt?.slice(0,7) <=lastMonthDate){
        isExistsInLasthMonth=true
      }
      else{
      isExistsInLasthMonth=false
    }
   return {...habit,isExistsInLasthMonth}
  })

// last month possible completion
  const lastMonthPossibleComplition =lastMonthExistsHabit?.reduce((sum,habit)=>{
     let count = 0;
     if((habit.isExistsInLasthMonth ===true)){
    for (let date=new Date(lastMonthStartDate);date<=endOfMonthLastMonth;date.setDate(date.getDate()+1)) {
      const dayName = date.toLocaleString('en-US', { weekday: 'long' }).toLocaleLowerCase();
      if(habit.selectedDays?.some((day)=>day.toLocaleLowerCase()===dayName)){
        count ++
      }
    }
  }
    return sum + count;
  },0)
  // last month copleted habits
const lastMonthCompletedHabit =lastMonthExistsHabit?.reduce((sum,habit)=>{
      if(habit.isExistsInLasthMonth){
        const completion =habit?.completedDates?.filter((date)=>date.slice(0, 7) === lastMonthDate) || 0
        return sum + completion?.length
      }
      return sum
},0)
// last month progress
const lastMonthProgress= lastMonthPossibleComplition>0?Math.round((lastMonthCompletedHabit/lastMonthPossibleComplition) *100):0
  
  let diff;
  if (lastMonthProgress > progress) {
    diff = `-${lastMonthProgress - progress}`;
  } else {
    diff = `+${progress - lastMonthProgress}`;
  }
  return {
    setThisMonthsHabit,
    thisMonthCompletedHabits,
    thisMonthPossibleCompletion,
    progress,
    diff,
  };
}
export default useOverallCompletion;
