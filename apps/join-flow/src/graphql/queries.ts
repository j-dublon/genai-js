import { gql } from "graphql-request";

export const GET_ADDRESSES = gql`
  query JoinServicesGetAddresses($postcode: String!) {
    getAddresses(postcode: $postcode) {
      line1
      line2
      line3
      postcode
      addressKey
      addressKeyType
    }
  }
`;
