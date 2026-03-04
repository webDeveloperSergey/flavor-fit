import { registerEnumType } from '@nestjs/graphql';

export enum OrderItemScalarFieldEnum {
    id = "id",
    recipeIngredientId = "recipeIngredientId",
    quantity = "quantity",
    orderId = "orderId",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(OrderItemScalarFieldEnum, { name: 'OrderItemScalarFieldEnum', description: undefined })
