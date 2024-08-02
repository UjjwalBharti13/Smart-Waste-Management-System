document.addEventListener('DOMContentLoaded', function() {
  const pointsElement = document.getElementById('points');
  const totalPointsElement = document.getElementById('total-points');
  const donateForm = document.getElementById('donate-form');
  const redeemForm = document.getElementById('redeem-form');
  const redeemMessage = document.getElementById('redeem-message');
  const productTypeElement = document.getElementById('product-type');
  const otherPointsContainer = document.getElementById('other-points-container');
  const otherPointsElement = document.getElementById('other-points');
  const redeemAmountElement = document.getElementById('redeem-amount');
  const redeemButton = redeemForm.querySelector('button');
  let points = parseInt(localStorage.getItem('rewardPoints')) || 0;
  let hasDonated = localStorage.getItem('hasDonated') === 'true';

  pointsElement.textContent = points;
  totalPointsElement.textContent = `Total points available for redemption: ${points}`;
  updateRedeemFormState();

  productTypeElement.addEventListener('change', function() {
    if (productTypeElement.value === 'other') {
      otherPointsContainer.style.display = 'block';
      otherPointsElement.required = true;
    } else {
      otherPointsContainer.style.display = 'none';
      otherPointsElement.required = false;
    }
  });

  donateForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const productType = productTypeElement.value;
    let pointsAwarded = getPointsForProduct(productType);

    if (productType === 'other') {
      pointsAwarded = parseInt(otherPointsElement.value) || 0;
    }

    points += pointsAwarded;
    localStorage.setItem('rewardPoints', points);
    pointsElement.textContent = points;
    totalPointsElement.textContent = `Total points available for redemption: ${points}`;
    localStorage.setItem('hasDonated', 'true');
    hasDonated = true;
    updateRedeemFormState();
    alert(`You have been awarded ${pointsAwarded} points for donating ${productType.replace('-', ' ')}. You can now redeem your reward points.`);
  });

  redeemForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const amountToRedeem = parseInt(redeemAmountElement.value);
    if (amountToRedeem <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    if (amountToRedeem > points) {
      alert('Insufficient points for redemption.');
      return;
    }
   
    redeemMessage.textContent = `After completion of donation, you can redeem ${amountToRedeem} points!`;
    redeemMessage.style.color = 'red';
  });

  function getPointsForProduct(type) {
    switch(type) {
      case 'clothes':
        return 200;
      case 'plastic':
        return 20;
      case 'toys':
        return 50;
      case 'reusable':
        return 100; 
      case 'electronics-working':
        return 300;
      case 'electronics-not-working':
        return 100;
      default:
        return 0;
    }
  }

  function updateRedeemFormState() {
    if (hasDonated) {
      redeemAmountElement.disabled = false;
      redeemButton.disabled = false;
    } else {
      redeemAmountElement.disabled = true;
      redeemButton.disabled = true;
    }
  }
});
