const { z } = require('zod');


const bookSchema = z.object({
  title: z.string().refine((title) => title.trim() !== '', {
    message: 'Title is required',
  }),
  author: z.string().refine((author) => author.trim() !== '', {
    message: 'Author is required',
  }),
  releasedYear: z.string().refine((releasedYear) => releasedYear.length === 4 && /^\d+$/.test(releasedYear), {
    message: 'ReleasedYear must be 4 digits',
  }),
  genre: z.string().refine((genre) => genre.trim() !== '', {
    message: 'Genre is required',
  }),
  country: z.string().refine((country) => country.trim() !== '', {
    message: 'Country is required',
  }),
  pages: z.number().refine((pages) => pages > 0, {
    message: 'Pages must be a positive number',
  }),
  publishingHouse: z.string().refine((publishingHouse) => publishingHouse.trim() !== '', {
    message: ' PublishingHouse is required',
  }),
  isbn: z.string().refine((isbn) => /^\d{3}-\d-\d{4}-\d{4}-\d$/.test(isbn), {
    message: 'ISBN must be in the format XXX-X-XXXX-XXXX-X',
  }),
  description: z.string().refine((description) => description.trim() !== '', {
    message: 'Description is required',
  }),
  illustrator: z.string().nullable().optional(),
  imgPath: z.string().nullable().optional()
});

const userSchema = z.object({
  username: z.string().refine((username) => username.trim() !== '', {
    message: 'Username is required',
  }),
  email_address: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().refine((password) => password.trim() !== '', {
    message: 'Password is required',
  }),
  role: z.string().refine((role) => role.trim() !== '', {
    message: 'Role is required',
  }),
  // the following field is a phone number, can only be numbers but can have a + at the beginning, have - / and . and is optional
  phone_number: z.string().refine((phone_number) => /^(\+)?(\d|\-|\.)*$/.test(phone_number), {
    message: 'Invalid phone number',
  }).optional(),
  country: z.string().refine((country) => country.trim() !== '', {
    message: 'Country is required',
  }),
  news_letter: z.boolean(),
  image: z.string().nullable().optional()
});


module.exports = { bookSchema, userSchema };