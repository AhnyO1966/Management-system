"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signUp(payload) {
        const { email, password, ...rest } = payload;
        const userEmail = await this.userRepository.findOne({ where: { email: email } });
        if (userEmail) {
            throw new common_1.HttpException('sorry user with this email already exist', 404);
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const user = await this.userRepository.save({
            email, password: hashPassword, ...rest
        });
        delete user.password;
        return user;
    }
    async signIn(payload) {
        const { email, password } = payload;
        const user = await this.userRepository.findOne({ where: { email: email } });
        if (!user) {
            throw new common_1.HttpException('invalid credentials', 400);
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new common_1.HttpException('invalid credentials', 400);
        }
        const jwtPayload = { id: user.id, email: user.email };
        const jwtToken = await this.jwtService.signAsync(jwtPayload);
        return { token: jwtToken };
    }
    async findEmail(email) {
        const mail = await this.userRepository.findOneByOrFail({ email });
        if (!mail) {
            throw new common_1.UnauthorizedException();
        }
        return mail;
    }
    async findAllUser() {
        return await this.userRepository.find();
    }
    async User(headers) {
        const authorizationHeader = headers.authorization;
        if (authorizationHeader) {
            const token = authorizationHeader.replace('Bearer', '');
            const seceret = process.env.JWT_SECRET;
            try {
                const decoded = this.jwtService.verify(token);
                let id = decoded["id"];
                let user = await this.userRepository.findOneBy({ id });
                return { id, name: user.username, email: user.email, role: user.role };
            }
            catch (error) {
                throw new common_1.UnauthorizedException('Invalid token  you are trying');
            }
        }
        else {
            throw new common_1.UnauthorizedException('Invalid or missing Bearer token');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map