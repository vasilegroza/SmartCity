import {Storage} from '@ionic/storage'
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt'
import {Injectable, NgZone}from '@angular/core'
//import {Observable} from 'rxjs/Rx'
import {Auth0Vars} from './auth0-variables';
declare var Auth0: any;
declare var Auth0Lock:any;
// Avoid name not found warnings

@Injectable()
export class AuthService {

  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0({clientID: Auth0Vars.AUTH0_CLIENT_ID, domain: Auth0Vars.AUTH0_DOMAIN });
  lock = new Auth0Lock(
    Auth0Vars.AUTH0_CLIENT_ID, 
    Auth0Vars.AUTH0_DOMAIN, 
    {
      socialButtonStyle: 'small',
      language:'en',
      auth: {
        redirect: false,
        params: {
          scope: 'openid profile offline_access',
          device: 'my-device'
        },
        sso: false
      },
      theme:{
        primaryColor: '#31324F'
      },
      allowForgotPassword: false
    });
  storage: Storage = new Storage('localstorage');
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  accessToken: string;
  idToken: string;
  loging_info:string="empty";
  constructor(private authHttp: AuthHttp, zone: NgZone) {
    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
      this.loging_info = "error cannot get profile from storage";
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    }).catch(error=>{
        console.log(error);
        this.idToken = null;
      this.loging_info += "error cannot get token from storage\n";
        
    });

    this.lock.on('authenticated', authResult => {
      if (authResult && authResult.accessToken && authResult.idToken) {
    
        this.loging_info += "logged in \n";
        console.log("login")
        this.storage.set('access_token', authResult.accessToken);
        this.storage.set('id_token', authResult.idToken);
        this.storage.set('refresh_token', authResult.refreshToken);
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;

        // Fetch profile information
        this.lock.getUserInfo(this.accessToken, (error, profile) => {
          if (error) {
            // Handle error
            this.loging_info += "error while getting user info\n";
            
            alert(error);
            return;
          }

          profile.user_metadata = profile.user_metadata || {};
          this.storage.set('profile', JSON.stringify(profile));
          this.user = profile;
          console.log("saved user:", this.user)
          this.loging_info += JSON.stringify(this.user);
        });

        this.lock.hide();

        this.zoneImpl.run(() => this.user = authResult.profile);
        // // Schedule a token refresh
        //this.scheduleRefresh();
      }

    });    
  }

  public authenticated() { 
    //  console.log(tokenNotExpired('id_token', this.idToken));
    return tokenNotExpired('id_token', this.idToken);
  }
  
  public login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }
  
  public logout() {
      console.log("logout user:", this.user)
    this.storage.remove('profile');
    this.storage.remove('access_token');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.zoneImpl.run(() => this.user = null);
    this.loging_info += "user logout \n";
    
    // Unschedule the token refresh
   // this.unscheduleRefresh();
  }
}