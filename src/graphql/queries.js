import { gql } from "@apollo/client";

const GetUser =gql`
query GetUser {
  getUser {
    email
    id
    name
  }
}
`
const GetHabits =gql`
query GetHabits{
  getHabits{
    category
    completedDates
    frequency
    id
    selectedDays
    streak
    longestStreak
    title
    createdAt
    user {
      email
      id
      name
    }
    userId
  }
}
`
const GetHabit =gql`
query getHabit($id: ID!) {
  getHabit(id: $id) {
    category
    completedDates
    frequency
    id
    selectedDays
    streak
    longestStreak
    title
    user {
      email
      id
      name
    }
    userId
  }
}
`

export {GetHabits,GetHabit,GetUser}