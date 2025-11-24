import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Kita tambahkan opsi ini agar Next.js tidak men-cache data selamanya (opsional tapi bagus untuk latihan)
export const dynamic = 'force-dynamic';

export default async function Home() {
  // Mengambil data dari database
  const mahasiswa = await prisma.mahasiswa.findMany();

  return (
    <main className="min-h-screen p-10 bg-white text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">Daftar Mahasiswa</h1>
      
      <div className="max-w-2xl mx-auto grid gap-4">
        {mahasiswa.map((mhs) => (
          <div key={mhs.id} className="border border-gray-300 p-4 rounded-lg shadow-sm hover:shadow-md transition">
            <h2 className="text-xl font-bold text-blue-600">{mhs.nama}</h2>
            <p className="text-gray-600">{mhs.jurusan}</p>
          </div>
        ))}

        {mahasiswa.length === 0 && (
          <p className="text-center text-gray-500">Belum ada data mahasiswa.</p>
        )}
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        <p>Data ini diambil dari SQLite (Read Only di Vercel)</p>
      </div>
    </main>
  );
}