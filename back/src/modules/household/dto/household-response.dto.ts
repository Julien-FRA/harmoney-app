export class HouseholdResponseDto {
  id: string;
  name: string;
  createdAt: Date;

  constructor(household: {
    id: string;
    name: string;
    createdAt: Date;
  }) {
    this.id = household.id;
    this.name = household.name;
    this.createdAt = household.createdAt;
  }
}

