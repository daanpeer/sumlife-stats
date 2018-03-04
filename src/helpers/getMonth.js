export default (date) => Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
}).format((new Date(date)));
