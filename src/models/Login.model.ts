/**
 * Model definition file
 * New models need to be added to the models/index.ts file
 *
 * /models/Login.model.ts
 *
 * Copyright (C) 2022 wadawe
 */

import { Sequelize, Model, INTEGER, CreationOptional, Optional, Association, NonAttribute, STRING, DATE } from "sequelize";
import { User } from "./User.model";

type LoginAttributes = {
    id : number;
    userId : number;
    refreshToken : string;
    expiresAt : Date;
}

type LoginOptionals = Optional<LoginAttributes, "id">;

/**
 * Define the model class
 */
export class Login extends Model<LoginAttributes, LoginOptionals> implements LoginAttributes {

    declare id : number;

    declare userId : number;

    declare refreshToken : string;

    declare expiresAt : Date;

    declare readonly createdAt : CreationOptional<Date>;

    declare readonly updatedAt : CreationOptional<Date>;

    declare static associations : {
        User : Association<Login, User>
    };

    declare readonly User ?: NonAttribute<User>;

    /**
     * Register the database model
     * @param connection A database connection
     */
    public static registerModel ( connection : Sequelize ) {

        Login.init( {

            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true
            },

            // Foreign key : User
            userId: {
                type: INTEGER,
                allowNull: false
            },

            refreshToken: {
                type: STRING( 128 ),
                allowNull: false
            },

            expiresAt: {
                type: DATE,
                allowNull: false
            }

        }, {

            sequelize: connection,
            charset: "utf8",
            collate: "utf8_general_ci",
            freezeTableName: true,
            indexes: [
                {
                    unique: false,
                    fields: [ "userId" ]
                },
                {
                    unique: false,
                    fields: [ "refreshToken" ]
                }
            ]

        } );

    }

    /**
     * Register all "has" model associations
     */
    public static registerHas () {}

    /**
     * Register all "belongs" model associations
     */
    public static registerBelongs () {
        Login.belongsTo( User, { as: "User", foreignKey: "userId", targetKey: "id" } );
    }

}
