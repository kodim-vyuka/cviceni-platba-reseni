const filterNonDigits = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 16);
};

const insertDashes = (digits: string): string => {
  if (digits.length <= 4) {
    return digits;
  }

  if (digits.length <= 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }

  if (digits.length <= 12) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
  }

  return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}-${digits.slice(12)}`;
}


const isMastercard = (value: string): boolean => {
  const twoDigits = Number(value.slice(0, 2));
  if (twoDigits >= 51 && twoDigits <= 55) {
    return true;
  }

  const fourDigits = Number(value.slice(0, 4));
  return fourDigits >= 2221 && fourDigits <= 2720;
};

const isVisa = (value: string): boolean => {
  return value.startsWith('4');
}

const isAmex = (value: string): boolean => {
  return value.startsWith('34') || value.startsWith('37');
}

const isDiscover = (value: string): boolean => {
  if (value.startsWith('6011')) {
    return true;
  }

  if (value.startsWith('65')) {
    return true;
  }

  const threeDigits = Number(value.slice(0, 3));
  return threeDigits >= 644 && threeDigits <= 649;
}

const isDiners = (value: string): boolean => {
  return value.startsWith('36') || value.startsWith('55');
}

const inputElement = document.querySelector('input');
inputElement.addEventListener('input', (event: MouseEvent) => {
  const target: HTMLInputElement = event.target as HTMLInputElement;
  const value = target.value;
  const digitsOnly = filterNonDigits(value);
  target.value = insertDashes(digitsOnly);

  const mastercardElement = document.querySelector('#mastercard');
  const visaElement = document.querySelector('#visa');
  const amexElement = document.querySelector('#amex');
  const discoverElement = document.querySelector('#discover');
  const dinersElement = document.querySelector('#diners');

  if (isMastercard(digitsOnly)) {
    mastercardElement.classList.add('active');
  } else {
    mastercardElement.classList.remove('active');
  }

  if (isVisa(digitsOnly)) {
    visaElement.classList.add('active');
  } else {
    visaElement.classList.remove('active');
  }

  if (isAmex(digitsOnly)) {
    amexElement.classList.add('active');
  } else {
    amexElement.classList.remove('active');
  }

  if (isDiscover(digitsOnly)) {
    discoverElement.classList.add('active');
  } else {
    discoverElement.classList.remove('active');
  }

  if (isDiners(digitsOnly)) {
    dinersElement.classList.add('active');
  } else {
    dinersElement.classList.remove('active');
  }
});
