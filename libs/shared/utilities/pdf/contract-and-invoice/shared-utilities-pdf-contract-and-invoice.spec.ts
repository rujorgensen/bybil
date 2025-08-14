import { sharedUtilitiesPdfContractAndInvoice } from './src/lib/shared-utilities-pdf-contract-and-invoice';

describe('sharedUtilitiesPdfContractAndInvoice', () => {
  it('should work', () => {
    expect(sharedUtilitiesPdfContractAndInvoice()).toEqual(
      'shared-utilities-pdf-contract-and-invoice'
    );
  });
});
