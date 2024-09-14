import { Model, DataTypes, Sequelize } from 'sequelize';

// Define the Artwork model class
export class Artwork extends Model {
    public id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public imageUrl!: string;
    public artistId!: number;
    public categoryId!: number;
}

// Initialize the model with the Sequelize instance
const initArtworkModel = (sequelize: Sequelize) => {
    Artwork.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artistId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        categoryId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'categories',
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: 'artworks',
        modelName: 'Artwork',
        timestamps: true, // Set to false if you don't need createdAt and updatedAt columns
    });

    return Artwork;
};

export default initArtworkModel;
