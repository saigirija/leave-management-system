import { BranchesEnum, ISelectOption } from '../types';

export const getSpecializationValues: Record<BranchesEnum, ISelectOption[]> = {
  [BranchesEnum.CSE]: [
    { label: 'COMPUTER SCIENCE (INFORMATION SECURITY)', value: 'CSIS' },
    { label: 'COMPUTER SCIENCE & ENGINEERING', value: 'CS' },
  ],
  [BranchesEnum.ECE]: [
    { label: 'VLSI', value: 'VLSI' },
    { label: 'EDT', value: 'EDT' },
    { label: 'SIGNAL_PROCESSING', value: 'SIGNAL_PROCESSING' },
    { label: 'COMMUNICATIONS', value: 'COMMUNICATIONS' },
  ],
  [BranchesEnum.MECHANICAL]: [
    { label: 'MANUFACTURING', value: 'MANUFACTURING' },
    { label: 'THERMAL', value: 'THERMAL' },
  ],
  [BranchesEnum.EEE]: [
    { label: 'POWER_ELECTRONICS', value: 'POWER_ELECTRONICS' },
    { label: 'POWER_SYSTEMS', value: 'POWER_SYSTEMS' },
    { label: 'INSTRUMENTATIONS', value: 'INSTRUMENTATIONS' },
  ],
  [BranchesEnum.CIVIL]: [
    { label: 'TRANSPORTATION', value: 'TRANSPORTATION' },
    { label: 'GEO-TECHNOLOGY', value: 'GEO-TECHNOLOGY' },
    { label: 'STRUCTURAL', value: 'STRUCTURAL' },
  ],
};
