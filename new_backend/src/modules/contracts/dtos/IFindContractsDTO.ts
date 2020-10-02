export default interface IFindContractsDTO {
    limit: number;
    page: number;
    whereStatus: {
        status: 'underAnalysis' | 'pendent' | 'accepted' | 'active';
    }[];
}
