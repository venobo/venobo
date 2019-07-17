import { NgModule } from '@angular/core';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import { WebSocketLink } from 'apollo-link-ws';
import { environment } from '@venobo/environment/renderer';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  exports: [
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
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
      uri: `http://localhost:${environment.serverPort}/graphql`,
    });
  }

  private createSubscriptionLink() {
    return new WebSocketLink({
      uri: `ws://localhost:${environment.serverPort}/graphql`,
      options: {
        reconnect: true,
      }
    });
  }
}
