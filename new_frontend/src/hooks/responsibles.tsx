import React, { createContext, useState, useCallback, useContext } from 'react';

interface IResponsible {
  id?: string;
  tmpId: string;
  name: string;
  birth_date: Date;
  nacionality: string;
  civil_state: string;
  profission: string;
  cpf: string;
  rg: string;
  address_street: string;
  address_number: string;
  address_complement?: string;
  address_neighborhood: string;
  address_city: string;
  address_cep: string;
  residencial_phone: string;
  commercial_phone: string;
  personal_phone: string;
  education_level: string;
  workplace: string;
  monthly_income: number;
  income_tax: boolean;
  email: string;
  rg_photo?: File;
  cpf_photo?: File;
  residencial_proof_photo?: File;
  kinship: string;
  responsible_type: 'financial' | 'supportive' | 'educational';
}

interface IResponsiblesContextData {
  responsibles: IResponsible[];
  getResponsible(tmpId: string): IResponsible | undefined;
  addResponsible(data: IResponsible): void;
  removeResponsible(tmpId: string): void;
  updateResponsible(data: IResponsible): void;
}

const ResponsiblesContext = createContext<IResponsiblesContextData>(
  {} as IResponsiblesContextData,
);

export const ResponsiblesProvider: React.FC = ({ children }) => {
  const [responsibles, setResponsibles] = useState<IResponsible[]>([]);

  const getResponsible = useCallback(
    (tmpId: string): IResponsible | undefined => {
      const responsible = responsibles.find(r => r.tmpId === tmpId);

      return responsible;
    },
    [responsibles],
  );

  const addResponsible = useCallback(
    (data: IResponsible) => {
      setResponsibles([...responsibles, data]);
    },
    [responsibles],
  );

  const removeResponsible = useCallback(
    (tmpId: string) => {
      const responsiblesWithoutRemoved = responsibles.filter(
        responsible => responsible.tmpId !== tmpId,
      );

      setResponsibles(responsiblesWithoutRemoved);
    },
    [responsibles],
  );

  const updateResponsible = useCallback(
    (data: IResponsible) => {
      const responsiblesWithoutUpdated = responsibles.filter(
        responsible => responsible.tmpId !== data.tmpId,
      );

      setResponsibles([...responsiblesWithoutUpdated, data]);
    },
    [responsibles],
  );

  return (
    <ResponsiblesContext.Provider
      value={{
        responsibles,
        getResponsible,
        addResponsible,
        removeResponsible,
        updateResponsible,
      }}
    >
      {children}
    </ResponsiblesContext.Provider>
  );
};

export const useResponsibles = (): IResponsiblesContextData => {
  const context = useContext(ResponsiblesContext);

  if (!context) {
    throw new Error(
      'useResponsibles must be used within an ResponsiblesContext Provider',
    );
  }

  return context;
};
