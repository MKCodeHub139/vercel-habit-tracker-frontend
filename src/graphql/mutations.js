import { gql } from "@apollo/client";

const CreateUser =gql`
mutation createUser($input:CreateUserInput!) {
  createUser(input:$input){
    id
    name
    email
  }
}
`
const LoginUser= gql`
mutation loginUser($input:LoginUserInput!){
loginUser(input:$input){
token
}
}
`
const LogoutUser =gql`
mutation {
logoutUser
}
`
const CreateHabit= gql`
mutation createHabit($input:CreateHabitInput!){
createHabit(input:$input){
    userId
    title
    category
    frequency
    selectedDays
    completedDates
}
}`
const UpdateCompleteDates =gql`
mutation updateCompleteDates($input:updateCompleteDatesInput!){
updateCompleteDates(input:$input){
    id 
    userId
    completedDates
}
}
`
const UpdateStreak =gql`
mutation updateStreak($input:updateStreakInput!){
updateStreak(input:$input){
id
userId
streak
longestStreak
}
}
`
const DeleteHabit =gql`
mutation deleteHabit($id:ID!){
deleteHabit(id:$id){
    id
    userId
}
}
`
const EditHabit =gql`
mutation editHabit($input:EditHabitInput!){
editHabit(input:$input){
    id
    userId
    title
    category
    frequency
    selectedDays
}
}
`
export {CreateUser,LoginUser,CreateHabit,UpdateCompleteDates,UpdateStreak,DeleteHabit,EditHabit,LogoutUser}