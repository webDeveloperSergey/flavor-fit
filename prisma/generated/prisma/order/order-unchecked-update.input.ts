import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { EnumOrderStatusFieldUpdateOperationsInput } from '../prisma/enum-order-status-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { OrderItemUncheckedUpdateManyWithoutOrderNestedInput } from '../order-item/order-item-unchecked-update-many-without-order-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class OrderUncheckedUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    orderId?: StringFieldUpdateOperationsInput;

    @Field(() => EnumOrderStatusFieldUpdateOperationsInput, {nullable:true})
    status?: EnumOrderStatusFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: StringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => OrderItemUncheckedUpdateManyWithoutOrderNestedInput, {nullable:true})
    @Type(() => OrderItemUncheckedUpdateManyWithoutOrderNestedInput)
    orderItems?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput;
}
