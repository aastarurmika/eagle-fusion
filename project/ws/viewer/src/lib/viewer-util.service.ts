import { ConfigurationsService } from '@ws-widget/utils'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { noop, Observable, BehaviorSubject } from 'rxjs'
import { NsContent } from '@ws-widget/collection'
import * as dayjs from 'dayjs'

@Injectable({
  providedIn: 'root',
})
export class ViewerUtilService {
  API_ENDPOINTS = {
    setS3Cookie: `/apis/v8/protected/content/setCookie`,
    PROGRESS_UPDATE: `/apis/protected/v8/user/realTimeProgress/update`,
  }
  downloadRegex = new RegExp(`(/content-store/.*?)(\\\)?\\\\?['"])`, 'gm')
  authoringBase = '/apis/authContent/'
  constructor(private http: HttpClient, private configservice: ConfigurationsService) { }

  private currentResource = new BehaviorSubject<NsContent.IContent | null>(null)
  castResource = this.currentResource.asObservable()

  editResourceData(newResource: any) {
    this.currentResource.next(newResource)
  }

  async fetchManifestFile(url: string) {
    this.setS3Cookie(url)
    const manifestFile = await this.http
      .get<any>(url)
      .toPromise()
      .catch((_err: any) => { })
    return manifestFile
  }

  private async setS3Cookie(contentId: string) {
    await this.http
      .post(this.API_ENDPOINTS.setS3Cookie, { contentId })
      .toPromise()
      .catch((_err: any) => { })
    return
  }

  realTimeProgressUpdate(contentId: string, request: any) {
    // console.log('realtime', contentId, request)
    this.http
      .post(`${this.API_ENDPOINTS.PROGRESS_UPDATE}/${contentId}`, request)
      .subscribe(noop, noop)
  }

  realTimeProgressUpdateQuiz(contentId: string, collectionId?: string, batchId?: string, status?: number) {
    let req: any
    if (this.configservice.userProfile) {
      req = {
        request: {
          userId: this.configservice.userProfile.userId || '',
          contents: [
            {
              contentId,
              batchId,
              status: status || 2,
              courseId: collectionId,
              lastAccessTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss:SSSZZ'),
            },
          ],
        },
      }
    } else {
      req = {}
    }
    this.http
      .patch(`${this.API_ENDPOINTS.PROGRESS_UPDATE}/${contentId}`, req)
      .subscribe(noop, noop)
  }
  getContent(contentId: string): Observable<NsContent.IContent> {
    return this.http.get<NsContent.IContent>(
      // tslint:disable-next-line:max-line-length
      `/apis/authApi/action/content/hierarchy/${contentId}?rootOrg=${this.configservice.rootOrg || 'aastar'}&org=${this.configservice.activeOrg || 'dopt'}`,
    )
  }

  getAuthoringUrl(url: string): string {
    return url
      // tslint:disable-next-line:max-line-length
      ? `/apis/authContent/${url.includes('/content-store/') ? new URL(url).pathname.slice(1) : encodeURIComponent(url)}`
      : ''
  }

  regexDownloadReplace = (_str = '', group1: string, group2: string): string => {
    return `${this.authoringBase}${encodeURIComponent(group1)}${group2}`
  }

  replaceToAuthUrl(data: any): any {
    return JSON.parse(
      JSON.stringify(data).replace(
        this.downloadRegex,
        this.regexDownloadReplace,
      ),
    )
  }

}
