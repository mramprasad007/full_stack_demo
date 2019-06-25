//S3 bucket policy

{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "S3ObjectPolicy",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "*",
            "Resource": [
                "arn:aws:s3:::devops-artifacts-codebuild",
                "arn:aws:s3:::devops-artifacts-codebuild/*"
            ]
        }
    ]
}

//userdat

#!/bin/bash
sudo apt-get update -y
sudo apt-get install ruby -y
sudo apt-get install wget -y
cd /home/ubuntu
wget https://aws-codedeploy-us-east-1.s3.amazonaws.com/latest/install
chmod +x ./install
sudo ./install auto
service codedeploy-agent start
rm install

//Iam roles to create

codedeploy - service role
Ec2 IAM Role - codedeploy, s3 full access



//referesh token

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  private authHeaders: HttpHeaders;
  refreshTokenInProgress = false;
  tokenRefreshedSource = new Subject();
  tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private adalService: AdalService, private sessionManagementHelperService: SessionManagementHelperService,
    private appInsightService: AppInsightService, private dialogRef: MatDialog) { }

  private _setAuthHeaders(access_token: any, token_type = 'Bearer') {
    this.authHeaders = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate, post- check=0, pre-check=0',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
    this.authHeaders = this.authHeaders.append('Authorization', token_type + ' ' + access_token);
    this.authHeaders = this.authHeaders.append('Content-Type', 'application/json');
  }

  refreshToken(request) {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      this.adalService.clearCache();
      const resource: any = this.adalService.GetResourceForEndpoint(request.url);
      const token: any = this.adalService.acquireToken(resource);
      this.appInsightService.logTrace('Session Info- AuthHttpInterceptor - Initating Authentication Token Refresh');
      console.info('Initating Authentication Token Refresh');
      return token
        .do(() => {
          this.appInsightService.logTrace('Session Info- AuthHttpInterceptor - Authentication Token Refresh Successfull');
          console.info('Authentication Token Refresh Successfull');
          this.refreshTokenInProgress = false;
          this.tokenRefreshedSource.next();
        });
    }
  }

  handleInterception(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {
    // setting authHeaders
    this._setAuthHeaders(this.sessionManagementHelperService.getAuthToken());
    request = request.clone({
      headers: this.authHeaders
    });
    return next.handle(request);
  }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.appInsightService.logTrace('API requext - ' + JSON.stringify(request));
    return this.handleInterception(request, next).catch(error => {
      this.appInsightService.logTrace('API - Error Response  - ' + JSON.stringify(error));
      if (error.status === 401) {
        this.appInsightService.logTrace('Session Info- AuthHttpInterceptor - Authentication Token Expired');
        console.info('Authentication Token Expired');
        return this.refreshToken(request)
          .mergeMap(() => {
            this.appInsightService.logTrace('Session Info- AuthHttpInterceptor - Retring API call' + request.url);
            console.info('Retring API call' + request.url);
            return this.handleInterception(request, next);
          });
      }
      console.log('throw default');
      return Observable.throw(error);
    });
  }
}
