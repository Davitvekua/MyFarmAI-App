export default function ErrorPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-bold">
        Oops! <br />
        Seite nicht gefunden
      </h1>{" "}
      <br />
      <a
        href={import.meta.env.BASE_URL}
        className="rounded-md bg-gray-600 px-4 py-2 text-white hover:bg-gray-800"
      >
        Zur Startseite
      </a>
    </div>
  )
}
