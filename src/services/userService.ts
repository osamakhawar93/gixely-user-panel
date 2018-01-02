import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Headers, RequestOptions } from '@angular/http';
import { ServiceUrl } from './serviceUrl';

@Injectable()

export class UserService {
    serviceUrl = new ServiceUrl();
    constructor(private http: Http) {

    }
   

    signUp(enteredUser){

        var data;
        data = { name: enteredUser.username, email: enteredUser.email , password:enteredUser.password, phone:enteredUser.phoneNumber};
        let headers = new Headers();

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(this.serviceUrl.baseUrl + "user/signup", data, { headers: headers })
            .map(res => res.json());

    }


    login(enteredUser){

        var data;
        data = {email: enteredUser.email , password:enteredUser.password};
        let headers = new Headers();

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(this.serviceUrl.baseUrl + "user/signin", data, { headers: headers })
            .map(res => res.json());

    }

    getDashboardData(token){

        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get(this.serviceUrl.baseUrl + "user/dashboard", { headers: headers })
            .map(res => res.json());
            
    }

    getGraphPoints(token){
        
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get(this.serviceUrl.baseUrl + "user/graphpoints", { headers: headers })
            .map(res => res.json());
    }

    getEthers(){

        let headers = new Headers();

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD", { headers: headers })
            .map(res => res.json());
    }

    getLiteCoins(){

        let headers = new Headers();

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get("https://min-api.cryptocompare.com/data/price?fsym=LTC&tsyms=USD", { headers: headers })
            .map(res => res.json());
    }

    getBitCoins(){

        let headers = new Headers();

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get("https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD", { headers: headers })
            .map(res => res.json());
    }


    buyEthers(token,eth_address){

        var data;
        data = {ethAddress:eth_address};
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(this.serviceUrl.baseUrl + "user/registerforicoeth", data, { headers: headers })
            .map(res => res.json());


    }

    getGixelyBalance(token,transactionType){

     
        var data;
        data = {verificationCodeType:transactionType};
        
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get(this.serviceUrl.baseUrl + "user/balance", { headers: headers })
            .map(res => res.json());

    }

    issueVerificationCode(token,transactionType){

        var data;
        data = {verificationCodeType:transactionType};
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(this.serviceUrl.baseUrl + "user/verificationcode", data, { headers: headers })
            .map(res => res.json());


    }


    sendGixelyTransaction(token,sendTransactionForm){

        var data;
        data = {toAddress:sendTransactionForm.ToAddress,amount:sendTransactionForm.CoinsAmount,verificationCode:sendTransactionForm.VerificationCode};
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(this.serviceUrl.baseUrl + "user/transaction", data, { headers: headers })
            .map(res => res.json());

    }
    
    getUsersWalletAddress(token){
        var data;
        data = {verificationCodeType:"TRANSACTION"};
        
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get(this.serviceUrl.baseUrl + "user/walletaddresss" , { headers: headers })
            .map(res => res.json());
    }


    getAllUsers(token){
        
        var data;
        data = {verificationCodeType:"TRANSACTION"};
        
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get(this.serviceUrl.baseUrl + "admin/users" , { headers: headers })
            .map(res => res.json());
    }

    blockThisUser(token,userId){
      

        var data;
        data = {userID:userId};
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(this.serviceUrl.baseUrl + "admin/users/block", data, { headers: headers })
            .map(res => res.json());
    }


    unBlockThisUser(token,userId){
        var data;
        data = {userID:userId};
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.post(this.serviceUrl.baseUrl + "admin/users/activate", data, { headers: headers })
            .map(res => res.json());
    }
   
    getAllTransactions(token){
        
        var data;
        data = {verificationCodeType:"TRANSACTION"};
        
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get(this.serviceUrl.baseUrl + "admin/transactions" , { headers: headers })
            .map(res => res.json());
    }

    getReferredMembers(token){

        var data;
        data = {verificationCodeType:"TRANSACTION"};
        
        let headers = new Headers();
        headers.append("authorization","JWT "+token);

        headers.append('Content-Type', 'application/json; charset=UTF-8');
        return this.http.get(this.serviceUrl.baseUrl + "user/referred" , { headers: headers })
            .map(res => res.json());

    }

}   