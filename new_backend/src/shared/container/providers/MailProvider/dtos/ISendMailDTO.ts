interface IMailContact {
    name: string;
    email: string;
}

// interface IMailVariables {
//     [key: string]: string;
// }

// interface IMailBody {
//     template: string;
//     variables: IMailVariables;
// }

export default interface ISendMailDTO {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    body: string;
}
