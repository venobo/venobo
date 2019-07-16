import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import { WebSocketLink } from 'apollo-link-ws';

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule,
  ],
})
export class GraphQLConfigModule {
  private readonly cache = new InMemoryCache();

  constructor(
    private readonly apollo: Apollo,
    private readonly httpLink: HttpLink,
  ) {
    this.apollo.create({
      link: this.createLink(),
      cache: this.cache,
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
        },
        watchQuery: {
          fetchPolicy: 'network-only',
        },
      },
    });
  }

  private createLink() {
    const subscriptionLink = this.createSubscriptionLink();
    const httpLink = this.createHttpLink();

    return split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      subscriptionLink,
      httpLink,
    )
  }

  private createHttpLink() {
    return this.httpLink.create({
      uri: 'http://localhost:8888',
    });
  }

  private createSubscriptionLink() {
    return new WebSocketLink({
      uri: 'http://localhost:8888',
      options: {
        reconnect: true,
      }
    });
  }
}
