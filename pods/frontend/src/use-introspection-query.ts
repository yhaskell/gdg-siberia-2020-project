import { gql, useQuery } from "@apollo/client";

const query = gql`
fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
  }
  possibleTypes {
    ...TypeRef
  }
}
fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}
fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}

query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    types {
      ...FullType
    }
  }
}
`;

export interface TypeRef {
  kind: string;
  name: string;
  ofType: {
    kind: string;
    name: string;
    ofType: {
      kind: string;
      name: string;
      ofType: {
        kind: string;
        name: string;
        ofType: {
          kind: string;
          name: string;
          ofType: {
            kind: string;
            name: string;
            ofType: {
              kind: string;
              name: string;
              ofType: {
                kind: string;
                name: string;
}}}}}}}}

export interface Field {
  name: string;
  description: string;
  args: InputValue[];
  type: TypeRef;
}

export interface InputValue {
  name: string;
  description: string;
  type: TypeRef;
  defaultValue: any;
}

export interface FullType {
  kind: string;
  name: string;
  description: string;
  fields: Field[];
  inputFields: InputValue[];
  interfaces: TypeRef[];
  enumValues: {
    name: string;
    description: string;
  }[];
  possibleTypes: TypeRef[];
}

export interface IntrospectionQueryResponse {
  __schema: {
    queryType: { name: string }
    mutationType: { name: string }
    types: FullType[];
  }
}

export default function useIntrospectionQuery() {
  const { data } = useQuery<IntrospectionQueryResponse>(query);

  return data?.__schema;
}

export function useTypes() {
  const schema = useIntrospectionQuery();

  if (!schema) return {};

  return Object.fromEntries(schema.types.map(type => [type.name, type]));
}