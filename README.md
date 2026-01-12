# Third-Party Storage Configuration Form

This project is a small React + TypeScript application that demonstrates a **dynamic provider-based form**, schema validation with **Zod**, form handling with **React Hook Form**, and **mocked backend validation errors**.

---

## ✨ Features

- Provider selection (AWS / GCP)
- Dynamic form fields based on selected provider
- Strong typing with TypeScript generics
- Validation using Zod schemas
- Mocked backend validation errors
- Responsive UI (mobile-friendly)
- Resulting destination JSON displayed in the UI

---

## 🧱 Tech Stack

- React
- TypeScript
- React Hook Form
- Zod
- Tailwind CSS
- shadcn/ui components

---

## ✅ Validation Rules

### Frontend (Zod)

- All fields are required
- Minimum length checks
- Custom validation example:
    - AWS bucket **must not contain the letter "a"**

### Mocked Backend Validation

- If the user enters the string **`"error"`** into **any field**:
    - Submission is blocked
    - A validation error is shown under the corresponding input
    - Error message:
      ```
      Field contains invalid value "error"
      ```

This simulates a real backend validation response.

---

## 🧪 Example Destination Output

Displayed below the form after successful submission:

```json
{
  "url": "s3://s3.us-east-1.amazonaws.com/my-bucket",
  "key": "myAccessKeyId",
  "secret": "mySecretAccessKey"
}
```

## 🚀 Running the Project

Install dependencies:

```bash
npm install
npm run dev
```

The application will be available at:
```bash
http://localhost:5173
```

## 📌 Possible Improvements

- Add animations for destination JSON appearance
- Add unit and integration tests
- Persist form state per provider
- Improve accessibility (ARIA labels, focus management)
- Sort imports lib
