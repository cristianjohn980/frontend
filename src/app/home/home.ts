import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../shared/services/api';

interface Store {
  id: number;
  kode_barang: string;
  nama_barang: string;
  jumlah: number;
  harga: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  stores: Store[] = [];

  newKodeBarang = '';
  newNamaBarang = '';
  newJumlah: number | null = null;
  newHarga: number | null = null;

  constructor(private api: Api) {}

  ngOnInit(): void {
    this.loadStores();
  }

  // 🔹 Ambil semua data store
  loadStores(): void {
    this.api.getStore({}).subscribe({
      next: (res: any) => {
        if (res.message === 'Success') {
          this.stores = res.val;
        } else {
          this.stores = [];
        }
      },
      error: (err) => {
        console.error('Error loading store data:', err);
      },
    });
  }

  // 🔹 Tambah barang ke store
  addStore(): void {
    if (
      !this.newKodeBarang.trim() ||
      !this.newNamaBarang.trim() ||
      this.newJumlah === null ||
      this.newHarga === null
    ) {
      alert('Semua field wajib diisi!');
      return;
    }

    this.api.addStore({
      kode_barang: this.newKodeBarang.trim(),
      nama_barang: this.newNamaBarang.trim(),
      jumlah: this.newJumlah,
      harga: this.newHarga,
    }).subscribe({
      next: (res: any) => {
        if (res.message === 'Success') {
          this.newKodeBarang = '';
          this.newNamaBarang = '';
          this.newJumlah = null;
          this.newHarga = null;
          this.loadStores();
        }
      },
      error: (err) => {
        console.error('Error adding store data:', err);
        alert('Gagal menambahkan barang!');
      },
    });
  }

  // 🔹 Edit barang store
  editStore(store: Store): void {
    const kode_barang = prompt('Edit Kode Barang:', store.kode_barang);
    const nama_barang = prompt('Edit Nama Barang:', store.nama_barang);
    const jumlah = prompt('Edit Jumlah:', store.jumlah.toString());
    const harga = prompt('Edit Harga:', store.harga.toString());

    if (!kode_barang || !nama_barang || jumlah === null || harga === null) return;

    this.api.editStore({
      id: store.id,
      kode_barang: kode_barang.trim(),
      nama_barang: nama_barang.trim(),
      jumlah: Number(jumlah),
      harga: Number(harga),
    }).subscribe({
      next: (res: any) => {
        if (res.message === 'Success') {
          this.loadStores();
        }
      },
      error: (err) => {
        console.error('Error editing store data:', err);
        alert('Gagal mengubah data barang!');
      },
    });
  }

  // 🔹 Hapus barang dari store
  deleteStore(store: Store): void {
    if (!confirm(`Hapus barang "${store.nama_barang}"?`)) return;

    this.api.deleteStore({ id: store.id }).subscribe({
      next: (res: any) => {
        if (res.message === 'Success') {
          this.loadStores();
        }
      },
      error: (err) => {
        console.error('Error deleting store data:', err);
        alert('Gagal menghapus barang!');
      },
    });
  }
}
