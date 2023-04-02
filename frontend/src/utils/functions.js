export const getListings = async () => {
  const data = await (await fetch('http://localhost:5005/listings')).json();

  const finalListings = [];
  for (const listing of data.listings) {
    const updatedListing = await (
      await fetch(`http://localhost:5005/listings/${listing.id}`)
    ).json();
    finalListings.push(updatedListing);
  }

  const destructuredFinalListings = finalListings.map((listingObj) => {
    const { listing } = listingObj;
    return listing;
  });

  for (let i = 0; i < finalListings.length; i++) {
    destructuredFinalListings[i].id = data.listings[i].id;
  }

  return destructuredFinalListings;
};

export const filterListings = (listing, filterInfo) => {
  // Filtering based on bedrooms and price
  if (filterInfo.minBeds && listing.metadata.beds < filterInfo.minBeds) {
    return false;
  }
  if (filterInfo.maxBeds && listing.metadata.beds > filterInfo.maxBeds) {
    return false;
  }
  if (
    filterInfo.minPrice &&
    parseInt(listing.price) < parseInt(filterInfo.minPrice)
  ) {
    return false;
  }
  if (
    filterInfo.maxPrice &&
    parseInt(listing.price) > parseInt(filterInfo.maxPrice)
  ) {
    return false;
  }

  // Filtering for date range
  if (
    filterInfo.startDate &&
    filterInfo.endDate &&
    !isWithinRanges(
      filterInfo.startDate,
      filterInfo.endDate,
      listing.availability
    )
  ) {
    return false;
  }

  // Filtering for Title and City
  if (!filterInfo.titleCity) {
    // If there is no filter for the title or city we accept the listing
    return listing;
  } else if (
    !listing.title.toLowerCase().includes(filterInfo.titleCity) &&
    !listing.address.city.toLowerCase().includes(filterInfo.titleCity)
  ) {
    return false;
  }

  return true;
};

const isWithinRanges = (startDate, endDate, availabilities) => {
  let rangeIsValid = false;

  // Creating a new array of availibities where each of the dates are date
  // objects
  const formattedAvailabilities = availabilities.map((availability) => {
    const formattedAvailability = { start: null, end: null };
    formattedAvailability.start = createValidDateObj(availability.start);
    formattedAvailability.end = createValidDateObj(availability.end);
    return formattedAvailability;
  });

  // Looping through all availabilities and checking if both our startDate
  // and endDate lie within the range of the availibility.
  for (const availability of formattedAvailabilities) {
    // console.log(eDate);
    if (
      startDate >= availability.start &&
      startDate <= availability.end &&
      endDate >= availability.start &&
      endDate <= availability.end
    ) {
      rangeIsValid = true;
    }
  }
  return rangeIsValid;
};

/**
 * Given a date which is a string in the format dd/mm/yyyy, this function
 * return a valid date object which models the provided date
 * @param {string} date
 */
const createValidDateObj = (date) => {
  const dateArray = date.split('/');
  const validFormat = dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
  return new Date(validFormat);
};

export const getAverageRating = (reviews) => {
  const numReviews = reviews.length;
  if (numReviews === 0) return 0;
  const ratingSum = reviews.reduce((a, b) => a + b, 0);
  const averageRating = ratingSum / numReviews;
  return averageRating;
};

// Function from the following article : https://stackabuse.com/javascript-get-number-of-days-between-dates/
export const getNumberOfDays = (start, end) => {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
};

/**
 * Given a list of bookings for a listing, returns the total profit that
 * the the listing has accrued
 * @param {array} listingBookings
 * @returns
 */
export const getTotalListingProfit = (listingBookings) => {
  const today = new Date();

  let listingProfit = 0;
  listingBookings.forEach((booking) => {
    const checkInDateObj = new Date(booking.dateRange.checkInDate);
    if (
      booking.status === 'accepted' &&
      checkInDateObj.getFullYear() === today.getFullYear()
    ) {
      listingProfit += booking.totalPrice;
    }
  });

  return listingProfit;
};

/**
 * Given a list of bookings for a listing, returns the total number of days that
 * the the listing has been booked.
 * @param {array} listingBookings
 * @returns
 */
export const getTotalDaysBooked = (listingBookings) => {
  const today = new Date();

  let daysBooked = 0;
  listingBookings.forEach((booking) => {
    const checkInDate = new Date(booking.dateRange.checkInDate);
    const checkOutDate = new Date(booking.dateRange.checkOutDate);
    if (
      booking.status === 'accepted' &&
      checkInDate.getFullYear() === today.getFullYear()
    ) {
      const bookingLength = getNumberOfDays(checkInDate, checkOutDate);
      daysBooked += bookingLength;
    }
  });
  return daysBooked;
};
