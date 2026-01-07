import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Admin } from "./admin.entity";

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
  ) {}

  async findByEmail(email: string) {
    return this.adminRepo.findOne({ where: { email } });
  }

  async findAll() {
    return this.adminRepo.find({
      select: ["id", "email", "role"],
    });
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException("Admin bulunamadı");
    return admin;
  }

  async create(email: string, password: string) {
    const admin = this.adminRepo.create({ email, password });
    return this.adminRepo.save(admin);
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    return this.adminRepo.remove(admin);
  }
}
