function checkIfCEPIsValid(cep: string): boolean {
    if (!cep.match(/^[0-9]*$/gm)) {
        return false;
    }

    return true;
}

export default checkIfCEPIsValid;
