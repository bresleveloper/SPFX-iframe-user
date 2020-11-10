import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './IframeWithUserNameDisplayWebPart.module.scss';
import * as strings from 'IframeWithUserNameDisplayWebPartStrings';

export interface IIframeWithUserNameDisplayWebPartProps {
  description: string;
  url: string;
}

export default class IframeWithUserNameDisplayWebPart extends BaseClientSideWebPart<IIframeWithUserNameDisplayWebPartProps> {

  public render(): void {
    let u = this.context.pageContext.user;

    let src = escape(this.properties.url) + `&loginName=${u.loginName}&displayName=${u.displayName}`;

    this.domElement.innerHTML = `
      <div>
        <iframe src="${ src }"></iframe>
      </div>`;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('url', { label: 'url' })
              ]
            }
          ]
        }
      ]
    };
  }
}
