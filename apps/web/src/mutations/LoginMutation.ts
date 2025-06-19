import { commitMutation, graphql } from "relay-runtime"
import { environment } from "../relay/environment"

const mutation = graphql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

export function loginCommit(
  email: string,
  password: string,
  onCompleted: (response: any) => void,
  onError: (error: any) => void
) {
  return commitMutation(environment, {
    mutation,
    variables: { email, password },
    onCompleted,
    onError
  })
}
